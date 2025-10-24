import { Container, Grid, Typography, Box } from '@mui/material';
import ReasonCard from '../common/ReasonCard';

import Reason1 from '../../assets/images/reason1.jpg'
import Reason2 from '../../assets/images/reason2.jpeg'
import Reason3 from '../../assets/images/reason3.jpg'
import Reason4 from '../../assets/images/reason4.png'


function ReasonsInit() {
  const reasons = [
    {
      title: 'Vehículos Certificados',
      text: 'Cada auto pasa una inspección técnica completa antes de ser puesto a la venta.',
      image: Reason1,
    },
    {
      title: 'Financiamiento Flexible',
      text: 'Te ofrecemos planes accesibles y adaptados a tus necesidades.',
      image: Reason2,
    },
    {
      title: 'Transparencia Total',
      text: 'Conoce el historial completo de cada vehículo y compra con confianza.',
      image: Reason3,
    },
    {
      title: 'Atención Personalizada',
      text: 'Nuestro equipo te acompaña en cada paso del proceso de compra.',
      image: Reason4,
    },
  ];

return (
    <Box sx={{ backgroundColor: '#fafafa', py: 10 }}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          align="center"
          sx={{ fontWeight: 'bold', mb: 6 }}
        >
          ¿Por Qué Elegirnos?
        </Typography>
        <Grid
          container
          spacing={4}
          justifyContent="center"
          alignItems="stretch"
        >
          {reasons.map((reason, index) => (
            <Grid
              item
              key={index}
              xs={12}
              sm={6}
              md={3}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Box sx={{ maxWidth: 260, width: '100%' }}>
                <ReasonCard
                  image={reason.image}
                  title={reason.title}
                  text={reason.text}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ReasonsInit;