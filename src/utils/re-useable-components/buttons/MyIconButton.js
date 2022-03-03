import { IconButton, Tooltip } from '@mui/material';

export const MyIconButton = ({ children, onClick, tip, btnClassName, tipClassName }) => {
    return (
        <div>
            <Tooltip title={tip} className={tipClassName} placement="top">
                <IconButton onClick={onClick} className={btnClassName}>
                    {children}
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default MyIconButton;
