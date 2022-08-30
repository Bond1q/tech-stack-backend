import Apartment from './Apartment.js'
class ApartmentController {

	create = async (req, res) => {
		try {
			const { title, rooms, price, description } = req.body
			if (this.#stringValidator(title, 99) && this.#numberValidator(+rooms, 0, 9999) &&
				this.#numberValidator(+price, 0, 999999999999) && description?.length < 999) {
				const apartment = await Apartment.create({ title, rooms, description, price })
				res.status(200).json(apartment)
			} else {
				res.status(400).json("Check your values")
			}
		} catch (error) {
			res.status(400).json(error)
		}
	}

	getAll = async (req, res) => {
		try {
			const { price, rooms } = req.query
			const roomsCount = {}
			if (+rooms) {
				roomsCount["rooms"] = rooms
			}

			let apartments = await Apartment.find(roomsCount).sort({ "price": price })

			return res.json(this.#apartmentsValuesChanger(JSON.parse(JSON.stringify(apartments))))
		} catch (error) {
			res.status(500).json(error)
		}
	}

	getOne = async (req, res) => {
		try {
			const { id } = req.params
			if (!id) {
				res.status(400).json({ message: 'Id has not be detected' })
			}
			const apartment = await Apartment.findById(id)
			return res.json(apartment)
		} catch (error) {
			res.status(500).json(error)
		}
	}

	update = async (req, res) => {
		try {
			const apartment = req.body
			if (!apartment._id) {
				res.status(400).json({ message: 'Id has not be detected' })
			}

			const { title, rooms, price, description } = apartment
			if (this.#stringValidator(title, 99) && this.#numberValidator(+rooms, 0, 9999) &&
				this.#numberValidator(+price, 0, 999999999999) && description?.length < 999) {
				const updatedApartment = await Apartment.findByIdAndUpdate(apartment._id, apartment, { new: true })
				return res.json(updatedApartment)
			} else {
				res.status(400).json("Check your values")
			}

		} catch (error) {
			res.status(500).json(error)
		}
	}

	delete = async (req, res) => {
		try {
			const { id } = req.params
			console.log(req.params)
			if (!id) {
				res.status(400).json({ message: 'Id has not be detected' })
			}
			const apartment = await Apartment.findByIdAndDelete(id)
			return res.json(apartment)
		} catch (error) {
			res.status(500).json(error)
		}
	}

	#stringValidator = (str, maxLength) => {
		return str.length < maxLength && str.length > 0;
	}

	#numberValidator = (number, minValue, maxValue) => {
		return number < maxValue && number > minValue;
	}

	#apartmentsValuesChanger = (apartments) => {
		return apartments.map(el => {
			const { _id, __v, ...filteredValues } = el
			return { ...filteredValues, id: _id }
		})

	}
}

export default new ApartmentController()