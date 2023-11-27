import './index.css';

const dataSource = [
  {
    src: 'https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png',
    alt: 'Edge',
  },
  {
    src: 'https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png',
    alt: 'Firefox',
  },
  {
    src: 'https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png',
    alt: 'Chrome',
  },
  {
    src: 'https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png',
    alt: 'Safari',
  },
  {
    src: 'https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png',
    alt: 'Opera',
  },
  {
    src: 'https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png',
    alt: 'Electron',
  },
];

const ErrorBrowser: React.FC = () => {
  return (
    <div className="container-page">
      <div>
        <h2>兼容环境</h2>
        <p>
          该项目暂不支持旧版浏览器（如 <strong>360 浏览器</strong>、<strong>QQ 浏览器</strong>
          等）访问。若打开的网页出现显示异常等情况，请使用以下浏览器打开。
        </p>
        <table>
          <thead>
            <tr>
              {dataSource.map((item) => (
                <th key={item.alt}>
                  <img src={item.src} alt={item.alt} width="24px" height="24px" />
                  <br />
                  {item.alt}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Edge</td>
              <td>last 2 versions</td>
              <td>last 2 versions</td>
              <td>last 2 versions</td>
              <td>last 2 versions</td>
              <td>last 2 versions</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ErrorBrowser;
