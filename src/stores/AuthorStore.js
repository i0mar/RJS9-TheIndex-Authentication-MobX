import { decorate, observable, computed } from "mobx";
import axios from "axios";
import instance from "./instance";

class AuthorStore {
  authors = [];
  loading = true;
  query = "";
  statusMessage = "";

  fetchAuthors = async () => {
    try {
      const res = await instance.get("/authors/list");
      this.authors = res.data;
      this.loading = false;
    } catch (err) {
      console.error(err.response);
    }
  };

  addAuthor = async newAuthor => {
    try {
      const res = await instance.post("/authors/", newAuthor);
      this.authors.unshift(res.data);
      this.statusMessage = "Success";
    } catch (err) {
      this.statusMessage = err.response;
    }
  };

  get filteredAuthors() {
    return this.authors.filter(author =>
      `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(this.query.toLowerCase())
    );
  }

  getAuthorById = async (id) => {
    try {
      const res = await instance.get(`/authors/${id}/`);
      return res.data;
    } catch (err) {
      console.error(err.response);
    }
  };
}

decorate(AuthorStore, {
  authors: observable,
  loading: observable,
  query: observable,
  filteredAuthors: computed
});

const authorStore = new AuthorStore();
authorStore.fetchAuthors();

export default authorStore;
