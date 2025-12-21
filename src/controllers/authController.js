console.log("AUTH CONTROLLER ÇALIŞIYOR");



const User = require("../models/User");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: "Kullanıcı oluşturuldu",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Register hatası" });
  }
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Kullanıcı var mı?
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });

    // Şifre doğru mu?
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Yanlış şifre" });

    // Token oluştur
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Giriş başarılı", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login hatası" });
  }
};
