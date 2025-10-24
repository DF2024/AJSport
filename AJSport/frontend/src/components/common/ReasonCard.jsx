import { Box, Typography } from '@mui/material';

export default function ReasonCard({ image, title, text }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        p: 3,
        borderRadius: 3,
        boxShadow: 2,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        },
      }}
    >
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: '100%',
          height: 180,
          objectFit: 'cover',
          borderRadius: 2,
          mb: 2,
        }}
      />
      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
        {title}
      </Typography>
      <Typography color="text.secondary">{text}</Typography>
    </Box>
  );
}
