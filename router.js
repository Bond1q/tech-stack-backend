import Router from "express";
import ApartmentConroller from "./ApartmentConroller.js";
const router = new Router()

router.post('/apartments', ApartmentConroller.create)
router.get('/apartments', ApartmentConroller.getAll)
router.get('/apartments/:id', ApartmentConroller.getOne)
router.put('/apartments', ApartmentConroller.update)
router.delete('/apartments/:id', ApartmentConroller.delete)

export default router