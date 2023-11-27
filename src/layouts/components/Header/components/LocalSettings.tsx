import { QuestionCircleOutlined, SettingOutlined, SoundOutlined } from '@ant-design/icons';
import { Alert, Button, Card, Divider, Drawer, Tooltip, theme } from 'antd';
import { useState } from 'react';
import LayoutToggle from './LocalSettingsAction/LayoutToggle';
import { MenuThemeModeSwitch } from './LocalSettingsAction/MenuThemeModeSwitch';
import SizeModeSwitch from './LocalSettingsAction/SizeModeSwitch';
import ThemeColorsSelect from './LocalSettingsAction/ThemeColorsSelect';
import ThemeModeSwitch from './LocalSettingsAction/ThemeModeSwitch';
import ThemeReset from './LocalSettingsAction/ThemeReset';
import WidthFixed from './LocalSettingsAction/WidthFixed';

interface ConfigItemProps {
  title: React.ReactNode;
  content: React.ReactNode;
  description?: React.ReactNode;
}

/** 设置区域内容的 Card 组件 */
const ConfigItem: React.FC<ConfigItemProps> = ({ title, content, description }) => {
  const { token } = theme.useToken();

  return (
    <Card
      size="small"
      bordered={false}
      style={{ marginBottom: token.margin, boxShadow: token.boxShadow }}
      bodyStyle={{ padding: `${token.paddingContentVerticalSM} ${token.paddingContentVerticalLG}` }}
    >
      <div className="flex justify-between items-center flex-wrap ">
        <div style={{ margin: `${token.paddingContentVerticalSM} 0` }}>
          {title}
          {description && (
            <Tooltip title={description}>
              <QuestionCircleOutlined className="text-xs ml-1" />
            </Tooltip>
          )}
        </div>
        {content}
      </div>
    </Card>
  );
};

const LocalSettings: React.FC = () => {
  const [openSetting, setOpenSetting] = useState(false);

  return (
    <>
      <Tooltip placement="bottomRight" title="本地设置">
        <Button type="text" icon={<SettingOutlined />} onClick={() => setOpenSetting(true)} />
      </Tooltip>

      <Drawer
        title="系统本地设置"
        placement="right"
        open={openSetting}
        onClose={() => setOpenSetting(false)}
      >
        <ConfigItem title="整体风格" content={<ThemeModeSwitch />} />
        <ConfigItem title="整体尺寸" content={<SizeModeSwitch />} />
        <ConfigItem title="导航模式" content={<LayoutToggle />} />
        <ConfigItem
          title="菜单风格"
          description="适当根据整体布局和风格调整"
          content={<MenuThemeModeSwitch />}
        />
        <ConfigItem title="内容区域宽度" content={<WidthFixed />} />
        <ConfigItem title="主题色" content={<ThemeColorsSelect />} />
        <ConfigItem title="重置设置" content={<ThemeReset />} />
        <Divider />
        <Alert
          message="根据使用习惯和风格进行配置，操作栏的内容配置将会长期生效"
          type="info"
          showIcon
          icon={<SoundOutlined />}
        />
      </Drawer>
    </>
  );
};

export default LocalSettings;
