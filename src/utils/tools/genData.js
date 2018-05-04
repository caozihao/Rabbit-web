import qiniuUploadUtils from "../tools/qiniuUpload";
import noImgUrl from '../../assets/deault-no-img.png'

const getImgUrl = (key) => {
  const publicObj = {
    key,
  }
  const publicUrl = qiniuUploadUtils.getPublicUrl(publicObj);
  return publicUrl;
}

const genImg = (text) => {
  let src = '';
  if (text) {
    src = getImgUrl(text);
  } else {
    src = noImgUrl;
  }
  return (<img className="row-img-style" src={src} alt="img" />);
}

export default {
  genImg,
}
