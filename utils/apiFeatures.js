class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }
  filter() {
    const queryStringObj = { ...this.queryString };
    const excludesFields = ["sortBy", "page", "limit", "fields", "keyword"];
    excludesFields.forEach((field) => delete queryStringObj[field]);
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, "$$$&");
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryString.sortBy) {
      const sortFields = this.queryString.sortBy.split(",").join(" ");
      this.mongooseQuery.sort(sortFields);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createAt");
    }
    return this;
  }
  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }
  search(modelName) {
    if (this.queryString.keyword) {
      const { keyword } = this.queryString;
      let query;
      if (modelName === "Product") {
        query = {
          $or: [
            { title: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
          ],
        };
      } else {
        query = { name: { $regex: keyword, $options: "i" } };
      }
      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }
  paginate(countDocuments) {
    const page = parseInt(this.queryString.page) || 1;
    const limit = parseInt(this.queryString.limit) || 50;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;
    // Pagination result
    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numberOfPages = Math.ceil(countDocuments / limit);
    // next page
    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }
    if (skip > 0) {
      pagination.prev = page - 1;
    }
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }
}
module.exports = ApiFeatures;
