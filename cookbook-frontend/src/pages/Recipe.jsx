import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from 'react-query';

import Axios from '../utils/Axios.js';
import {
  AppBar,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import Android12Switch from '../components/Android12Switch.jsx';
import { ChevronLeft } from '@mui/icons-material';

export default function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const navigate = useNavigate();

  const { isLoading } = useQuery(['recipe', id], () => {
    return Axios.get(`recipes/${id}`).then((data) => setRecipe(data.data));
  });

  if (isLoading) return <></>;

  return (
    <>
      <AppBar
        style={{ backgroundColor: '#fff' }}
        position="static"
        sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate('/recipes')}
          >
            <ChevronLeft />
          </IconButton>
          <Typography variant="h5" color="#765A00" component="div">
            {recipe.name}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: '4em' }}>
        <img
          src={
            !!recipe.image
              ? `http://localhost:3000/images/${recipe.image}`
              : 'http://localhost:3000/images/unknown.png'
          }
          style={{ width: '100%' }}
        />
        <Typography variant="h5">Ingredients</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>done?</TableCell>
              <TableCell>name</TableCell>
              <TableCell>amount</TableCell>
              <TableCell>unit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipe.ingredients &&
              recipe.ingredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell>
                    <Android12Switch />
                  </TableCell>
                  <TableCell>{ingredient.name}</TableCell>
                  <TableCell>{ingredient.amount}</TableCell>
                  <TableCell>{ingredient.unit}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Typography variant="h5">Steps</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>done?</TableCell>
              <TableCell>step number</TableCell>
              <TableCell>instruction</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipe.steps &&
              recipe.steps.map((step) => (
                <TableRow key={step.id}>
                  <TableCell>
                    <Android12Switch />
                  </TableCell>
                  <TableCell>{step.step_number}</TableCell>
                  <TableCell>{step.content}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Typography variant="h5">Nutrition Values</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>amount</TableCell>
              <TableCell>unit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recipe.nutritions &&
              recipe.nutritions.map((nutrition) => (
                <TableRow key={nutrition.id}>
                  <TableCell>{nutrition.name}</TableCell>
                  <TableCell>{nutrition.amount}</TableCell>
                  <TableCell>{nutrition.unit}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
}
