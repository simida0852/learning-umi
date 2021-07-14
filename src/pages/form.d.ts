import { FormProps } from 'antd/es/form';

export interface InnerFormProps extends Partial<FormProps> {
  bizId?: EntityId;
  bizDataLoading: boolean;
  onReset?: () => void;
}
