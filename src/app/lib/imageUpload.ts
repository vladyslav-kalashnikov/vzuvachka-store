const MAX_SOURCE_IMAGE_MB = 15;
const MAX_SOURCE_IMAGE_BYTES = MAX_SOURCE_IMAGE_MB * 1024 * 1024;
const DEFAULT_TARGET_IMAGE_MB = 4;
const DEFAULT_TARGET_IMAGE_BYTES = DEFAULT_TARGET_IMAGE_MB * 1024 * 1024;
const DEFAULT_MAX_DIMENSION = 2400;

type PrepareImageOptions = {
    maxSourceBytes?: number;
    targetBytes?: number;
    maxDimension?: number;
};

function fileExtensionFromType(type: string) {
    if (type === "image/png") return "png";
    if (type === "image/webp") return "webp";
    return "jpg";
}

function loadImage(file: File) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const objectUrl = URL.createObjectURL(file);
        const image = new Image();

        image.onload = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(image);
        };

        image.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error("Не вдалося прочитати зображення"));
        };

        image.src = objectUrl;
    });
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number) {
    return new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    resolve(blob);
                    return;
                }

                reject(new Error("Не вдалося стиснути зображення"));
            },
            type,
            quality
        );
    });
}

export async function prepareImageForUpload(
    file: File,
    options: PrepareImageOptions = {}
) {
    const maxSourceBytes = options.maxSourceBytes ?? MAX_SOURCE_IMAGE_BYTES;
    const targetBytes = options.targetBytes ?? DEFAULT_TARGET_IMAGE_BYTES;
    const maxDimension = options.maxDimension ?? DEFAULT_MAX_DIMENSION;

    if (!file.type.startsWith("image/")) {
        throw new Error("Підтримуються лише зображення");
    }

    if (file.size > maxSourceBytes) {
        throw new Error(
            `Файл занадто великий. Максимум ${Math.round(
                maxSourceBytes / 1024 / 1024
            )} MB`
        );
    }

    if (file.size <= targetBytes) {
        return file;
    }

    const image = await loadImage(file);
    const scale = Math.min(
        1,
        maxDimension / Math.max(image.width, image.height)
    );
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));
    const canvas = document.createElement("canvas");

    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");

    if (!context) {
        throw new Error("Не вдалося підготувати зображення");
    }

    context.drawImage(image, 0, 0, width, height);

    const preferredType =
        file.type === "image/png" && file.size < targetBytes * 1.5
            ? "image/png"
            : "image/webp";
    const qualities = preferredType === "image/png"
        ? [undefined]
        : [0.9, 0.82, 0.74, 0.66, 0.58, 0.5, 0.42];

    for (const quality of qualities) {
        const blob = await canvasToBlob(canvas, preferredType, quality);

        if (blob.size <= targetBytes) {
            return new File(
                [blob],
                `${file.name.replace(/\.[^.]+$/, "")}.${fileExtensionFromType(preferredType)}`,
                { type: preferredType }
            );
        }
    }

    const fallbackBlob = await canvasToBlob(canvas, "image/jpeg", 0.4);

    if (fallbackBlob.size > targetBytes) {
        throw new Error(
            "Не вдалося достатньо стиснути фото. Спробуйте інше зображення."
        );
    }

    return new File(
        [fallbackBlob],
        `${file.name.replace(/\.[^.]+$/, "")}.jpg`,
        { type: "image/jpeg" }
    );
}

export const imageUploadLimits = {
    maxSourceMb: MAX_SOURCE_IMAGE_MB,
    targetMb: DEFAULT_TARGET_IMAGE_MB,
};
