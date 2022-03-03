import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteButton({ onClick }) {
    return (
        <div>
            <IconButton aria-label="delete" size="large" onClick={onClick}>
                <DeleteIcon fontSize="inherit"></DeleteIcon>
            </IconButton>
        </div>
    );
}
