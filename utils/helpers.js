module.exports = {
    iterate: (animals) => {
        for (i= 0; i<animals.length; i++){
            if (animals[i].primary_photo_cropped.small === null) {
                i++
            } else {
                return animals[i]
            }
        }
    }
}