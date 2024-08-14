import Document from "../models/document.model.js";

const findOrCreateDocument = async (documentId, loggedInUser) => {
  if (!documentId) return;
  const document = await Document.findById(documentId);
  if (document) return document;
  const newDocument = await Document.create({
    _id: documentId,
    docsOwner: loggedInUser,
  });
  return newDocument;
};

const saveDocument = async (documentId, data) => {
  if (!documentId || !data) return;

  const updatedDocument = await Document.findByIdAndUpdate(
    documentId,
    { data },
    { new: true }
  );
  return updatedDocument;
};
export { findOrCreateDocument, saveDocument };
