import express from 'express'
import categoryController from '../controllers/categoryController.js';
const categoryRouter = express.Router();

categoryRouter.get('/get-all', categoryController.getAll)
categoryRouter.get('/:id', categoryController.getDetail)
categoryRouter.post('/', categoryController.create)
categoryRouter.put('/:id', categoryController.update)
categoryRouter.delete('/:id', categoryController.delete)

export default categoryRouter;