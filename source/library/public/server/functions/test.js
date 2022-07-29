import { Notebook } from "./notebook.js"

try {
    let book = new Notebook();
    book.loadBook("User Guide");

    console.log(book.title);
    console.log(book.summary);
    console.log(book.owner);
    console.log(book.private);
    Object.keys(book.pages).forEach(x => console.log(`${x} -> ${book.pages[x]}`));

    book.addPage("4. fourth secion", "This is yet another page. Number four I think.")

    book.removePage("2. second section")
    book.saveBook();
} catch (error) {
    console.log("Exception: " + error.stack);
}