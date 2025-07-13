
export const analyzeResume = async (formData) => {
  const response = await fetch("http://localhost:8084/api/resume/analyze", {
    method: "POST",
    body: formData,
  });
  return response.json();
};