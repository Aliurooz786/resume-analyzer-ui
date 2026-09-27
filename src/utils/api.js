
export const analyzeResume = async (formData) => {
  const response = await fetch("http://localhost:8086/api/v1/resume/tailor", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) throw new Error("API error");
  return response.blob();
};