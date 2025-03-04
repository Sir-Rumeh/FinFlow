import { Button, useMediaQuery } from '@mui/material';
import { MouseEvent } from 'react';

type Props = {
  onClick?: ((event: MouseEvent<HTMLButtonElement>) => void) | (() => void);
  disabled?: boolean;
  children?: JSX.Element | string;
  width?: string;
  height?: string;
  border?: number;
  textSize?: number;
  fontWeight?: number;
  fontSize?: string;
  borderColor?: string;
  variant?: 'contained' | 'outlined' | 'text';
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  color?: string;
  hoverColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  title?: string;
  customClass?: string;
  customPaddingX?: string;
  alignContent?: string;
};

const ButtonComponent = (props: Props) => {
  const isSmallWidth = useMediaQuery('(max-width:570px)');
  return (
    <div className={`0 flex h-full flex-col items-center justify-center ${props.customClass} `}>
      <Button
        disabled={props.disabled}
        onClick={props.onClick}
        variant={props.variant}
        type={props.type}
        sx={{
          fontFamily: " 'Gotham', sans-serif ",
          width: props.width ? props.width : '100%',
          height: props.height ? props.height : '2.67rem',
          borderRadius: '8px',
          color: props.color,
          ':hover': {
            color: props.hoverColor ? props.hoverColor : props.color,
            backgroundColor: props.hoverBackgroundColor ? props.hoverBackgroundColor : '#FBF8FF',
            borderColor: props.borderColor,
            boxShadow: 'none',
          },
          backgroundColor: props.backgroundColor,
          border: props.border,
          borderColor: props.borderColor,
          textTransform: 'capitalize',
          fontSize: props.fontSize,
          fontWeight: props.fontWeight ? props.fontWeight : undefined,
          display: 'flex',
          alignContent: props.alignContent ? props.alignContent : 'center',
          justifyContent: 'between',
          rowGap: '2px',
          padding: '5px',
          paddingX: props.customPaddingX && !isSmallWidth ? props.customPaddingX : '8px',
        }}
        fullWidth={props.fullWidth}
        startIcon={props.startIcon}
        endIcon={props.endIcon}
        color="primary"
      >
        {props.title} {props.children}
      </Button>
    </div>
  );
};

export default ButtonComponent;
