import ContentLoader from 'react-content-loader'

const MyLoader: React.FC = () => (
  <ContentLoader
    speed={2}
    width={412}
    height={220}
    viewBox='0 0 412 220'
    backgroundColor='#3c3e44'
    foregroundColor='#202329'>
    <rect x='1' y='5' rx='20' ry='20' width='412' height='208' />
  </ContentLoader>
)

export default MyLoader
