import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const ColorLabel = styled(Typography)(({ color }) => ({
    display: 'inline-block',
    padding: '4px 8px',
    border: `2px solid ${color}`,
    borderRadius: '4px',
    marginRight: '10px',
    background: color,  // Aplicando o gradiente como fundo
    color: 'white',     // Texto branco para contraste
    border: '1px solid transparent',
}));

const Legend = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ margin: '15px' }}
        >
            <Box
                display="flex"
                flexWrap="wrap"
                gap={2}
                justifyContent="center"
                sx={{ marginBottom: '15px' }}
            >
                {/* Siglas */}
                <ColorLabel color="black">SSL - Suíte Super Luxo</ColorLabel>
                <ColorLabel color="black">SRM - Suíte Real Master</ColorLabel>
                <ColorLabel color="black">SST - Suíte Standart</ColorLabel>
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    {/* Legendagem de Cores */}
                    <ColorLabel color="red">Ocupada</ColorLabel>
                    <ColorLabel color="green">Desocupada</ColorLabel>
                    <ColorLabel color="blue">Manutenção</ColorLabel>
                    <ColorLabel color="purple">SAÍDA EXTRAPOLADA</ColorLabel>
                    <ColorLabel color="gray">Cinza</ColorLabel>
                    <ColorLabel color="orange">suja</ColorLabel>
                    <ColorLabel color="linear-gradient(to right, green 50%, red 50%)">SAÍDA  HOJE
                    </ColorLabel>
                </Box>
            </Box>


        </Box>
    );
};

export default Legend;
