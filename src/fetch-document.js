const BUCKET_URL = process.env.REACT_APP_BUCKET_URL;

const fetchApiDocument = async (document, authToken) => {
  if (!authToken) return '';

  const res = await fetch(`${BUCKET_URL}${encodeURIComponent(document)}?alt=media`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!res.ok) {
    const response = await res.text();

    throw new Error(response);
  }

  return res.json();
};

export default fetchApiDocument;
