import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  fullName: Yup.string().required('Obrigatório'),
  birthDate: Yup.date().required('Obrigatório'),
  cpf: Yup.string().matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido'),
  motivation: Yup.string().required('Explique sua motivação')
});

export default function SubscriptionForm() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { fullName: '', birthDate: '', cpf: '', motivation: '' },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      navigate('/volunteer');
    },
  });

  return (
    <Paper sx={{ p: 3, maxWidth: 600, margin: '20px auto' }}>
      <Typography variant="h4" gutterBottom>Candidatura</Typography>
      
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nome Completo"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Data de Nascimento"
              type="date"
              InputLabelProps={{ shrink: true }}
              name="birthDate"
              value={formik.values.birthDate}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="CPF"
              name="cpf"
              placeholder="000.000.000-00"
              value={formik.values.cpf}
              onChange={formik.handleChange}
              error={formik.touched.cpf && Boolean(formik.errors.cpf)}
              helperText={formik.touched.cpf && formik.errors.cpf}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Motivação"
              name="motivation"
              value={formik.values.motivation}
              onChange={formik.handleChange}
              error={formik.touched.motivation && Boolean(formik.errors.motivation)}
              helperText={formik.touched.motivation && formik.errors.motivation}
            />
          </Grid>

          <Grid item xs={12}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              sx={{ mr: 2 }}
            >
              Enviar Candidatura
            </Button>
            <Button variant="outlined">Cancelar</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}