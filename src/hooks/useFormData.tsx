const useFormData = (images, formValues) => {
    const formData = new FormData();

    Object.keys(formValues).forEach((key) => {
        formData.append(key, formValues[key]);
    });

    if (images) {
        images.forEach((image) => {
            formData.append("images[]", {
                uri: image.url,
                name: "image",
                type: "image/jpeg",
            } as unknown as Blob);
        });
    }
    return formData;
};

export default useFormData;
