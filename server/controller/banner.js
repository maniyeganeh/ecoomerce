const Banner = require("../models/banner")
const User = require("../models/user")
exports.getBanner = async (req, res) => {
    try {
        const banner = await Banner.find({}).sort({ _id: -1 })
        res.status(200).json(banner)
    }
    catch (err) {
        res.status(500).json({ message: "Something went Wrong" });

    }

}
exports.createBanner = async (req, res) => {

    const { title, largeText, midText, saleTime } = req.body;
    const images = req.files;
    const creator = req.userId
    const banner = new Banner({
        title,
        largeText,
        midText,
        saleTime,
        images,
        creator
    })
    let user;
    user = await User.findById(creator)

    if (!user) return res.status(404).json({ message: "User Not Found" })
    try {
        await banner.save()
        user.banners.push(banner)
        await user.save()
        res.status(201).json(banner)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something Went Wrong" })
    }


}

exports.removeBanner = async (req, res) => {
    const bannerId = req.params.bannerId;


    try {
        const banner = await Banner.findById(bannerId)
        if (!banner) return res.status(404).json({ message: "Banner Not Found" })
        await Banner.findByIdAndDelete(bannerId)
        let user;
        user = await User.findById(req.userId)
        user.banners.pull(bannerId)
        await user.save()
        res.status(200).json({ message: "Banner Deleted" })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "something went wrong" })
    }
}

exports.updateBanner = async (req, res) => {
    const bannerId = req.params.bannerId;
    const creator = req.userId
    const { title, largeText, midText, saleTime } = req.body
    try {
        const banner = await Banner.findById(bannerId)
        if (banner.creator.toString() !== creator) return res.status(401).json({ message: "You can't update this banner" })
        if (!banner) return res.status(404).json({ message: "Banner Not Found" })
        const updatedBanner = { title, largeText, midText, saleTime }
        await Banner.findByIdAndUpdate(bannerId, updatedBanner, { new: true })
        res.status(200).json(updatedBanner)
    }
    catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }
}