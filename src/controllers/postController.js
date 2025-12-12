const Post = require("../models/Post");

// 🟢 Blog yazısı oluşturma
exports.createPost = async (req, res) => {
  try {
    const { title, content, isPublic } = req.body;

    const newPost = await Post.create({
      title,
      content,
      isPublic,
      author: req.user.id, // Token'dan gelen kullanıcı id
    });

    res.json({ message: "Post oluşturuldu", post: newPost });
  } catch (error) {
    res.status(500).json({ error: "Post oluşturulurken hata oluştu" });
  }
};

// 🟢 Kullanıcının kendi yazılarını listeleme
exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Postlar alınamadı" });
  }
};

// 🟢 Public yazıları listeleme (BUNU REDIS İÇİN KULLANACAĞIZ)
exports.getPublicPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isPublic: true });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Public postlar alınamadı" });
  }
};

// 🟢 Tek bir post getirme
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post bulunamadı" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Post getirilemedi" });
  }
};

// 🟢 Post güncelleme
exports.updatePost = async (req, res) => {
  try {
    const { title, content, isPublic } = req.body;

    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id },
      { title, content, isPublic },
      { new: true }
    );

    if (!post)
      return res.status(404).json({ message: "Güncellenecek post bulunamadı" });

    res.json({ message: "Post güncellendi", post });
  } catch (error) {
    res.status(500).json({ error: "Post güncellenemedi" });
  }
};

// 🟢 Post silme
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id,
    });

    if (!post)
      return res.status(404).json({ message: "Silinecek post bulunamadı" });

    res.json({ message: "Post silindi" });
  } catch (error) {
    res.status(500).json({ error: "Post silinemedi" });
  }
};
