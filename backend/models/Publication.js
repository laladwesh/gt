import mongoose from 'mongoose';

// Covers: journals, conferences, books, bookChapters, patents, shortPapers
const publicationSchema = new mongoose.Schema({
  pubType: {
    type:     String,
    enum:     ['journal', 'conference', 'book', 'bookChapter', 'patent', 'shortPaper'],
    required: true,
  },
  // Common fields
  authors:   String,
  title:     { type: String, required: true },
  venue:     String,
  year:      String,
  // Journal / Conference extras
  volume:    String,
  issue:     String,
  pages:     String,
  doi:       String,
  award:     String,
  // Book extras
  isbn:      String,
  // Patent-specific
  inventors: String,
  number:    String,
  status:    String,
  // Short paper type (Poster / Short Paper)
  paperType: String,
  // General note
  note:      String,
  order:     { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Publication', publicationSchema);
