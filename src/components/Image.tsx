import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import { Box, SxProps, Theme } from '@mui/material';
// utils
import { getRatio } from '../utils/image';

interface ImageProps extends LazyLoadImageProps {
  className?: string;
  disabledEffect?: boolean;
  withoutPlaceholder?: boolean;
  effect?: 'blur' | 'black-and-white' | 'opacity'; // Adjust according to your available effects
  placeholderSrc?: string;
  ratio?: '4/3' | '3/4' | '6/4' | '4/6' | '16/9' | '9/16' | '21/9' | '9/21' | '1/1' | '21/4';
  sx?: SxProps<Theme>;
}

export default function Image({
  ratio,
  disabledEffect = false,
  effect = 'blur',
  sx,
  withoutPlaceholder,
  placeholderSrc,
  className,
  ...other
}: ImageProps) {
  if (ratio) {
    return (
      <Box
        component="span"
        className={className}
        sx={{
          width: 1,
          lineHeight: 0,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          pt: getRatio(ratio),
          '& .wrapper': {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            lineHeight: 0,
            position: 'absolute',
            backgroundSize: 'cover !important',
          },
          ...sx,
        }}
      >
        <Box
          component={LazyLoadImage}
          wrapperClassName="wrapper"
          effect={disabledEffect ? undefined : effect}
          placeholderSrc={!withoutPlaceholder ? '' : placeholderSrc || '/img/img_placeholder.svg'}
          sx={{ width: 1, height: 1, objectFit: 'cover' }}
          {...other}
        />
      </Box>
    );
  }

  return (
    <Box
      component="span"
      className={className}
      sx={{
        lineHeight: 0,
        display: 'block',
        overflow: 'hidden',
        '& .wrapper': { width: 1, height: 1, backgroundSize: 'cover !important' },
        ...sx,
      }}
    >
      <Box
        component={LazyLoadImage}
        wrapperClassName="wrapper"
        effect={disabledEffect ? undefined : effect}
        placeholderSrc={!withoutPlaceholder ? '' : placeholderSrc || '/img/img_placeholder.svg'}
        sx={{ width: 1, height: 1, objectFit: 'cover' }}
        {...other}
      />
    </Box>
  );
}
