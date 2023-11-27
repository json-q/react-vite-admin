import { themeColors } from '@/config/themeConfig';
import useAllStores from '@/stores';
import { CheckOutlined } from '@ant-design/icons';
import { Space, Tooltip } from 'antd';
import { shallow } from 'zustand/shallow';

interface ColorItemProps {
  bgColor: string;
  tip: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  active: boolean;
}

const ColorItem: React.FC<ColorItemProps> = ({ bgColor, tip, active, onClick }) => {
  return (
    <Tooltip placement="top" title={tip}>
      <div
        className="w-7 h-7 leading-7 text-center text-white rounded-md cursor-pointer"
        style={{ backgroundColor: bgColor }}
        onClick={onClick}
      >
        {active && <CheckOutlined />}
      </div>
    </Tooltip>
  );
};

const ThemeColorsSelect: React.FC = () => {
  const { colorPrimary, actionColorPrimary } = useAllStores(
    (state) => ({
      colorPrimary: state.colorPrimary,
      actionColorPrimary: state.actionColorPrimary,
    }),
    shallow,
  );

  return (
    <Space wrap size="small" direction="horizontal">
      {themeColors.map(({ color, tip }) => (
        <ColorItem
          key={color}
          bgColor={color}
          tip={tip}
          active={colorPrimary === color}
          onClick={() => actionColorPrimary(color)}
        />
      ))}
    </Space>
  );
};

export default ThemeColorsSelect;
