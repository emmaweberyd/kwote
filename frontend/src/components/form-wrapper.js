import styled from '@emotion/styled';

export const FormWrapper = styled.div(() => ({
    marginLeft: 'auto', 
    marginRight: 'auto', 
    padding: '20px',
    borderRadius: '20px',
    '@media (min-width: 480px)': {
        width: '400px',
        padding: '40px',
        backgroundColor: 'white'
    }
}));