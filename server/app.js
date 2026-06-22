app.use("/uploads", express.static("uploads"));
app.use("/api", productImageRouter);