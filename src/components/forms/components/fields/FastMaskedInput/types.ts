import { MaskedInputProps } from 'antd-mask-input/build/main/lib/MaskedInput';

export interface FastMaskedProps extends MaskedInputProps {
  name: string;
  mask: any;
}
