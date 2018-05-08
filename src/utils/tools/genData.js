import qiniuUploadUtils from "../tools/qiniuUpload";
import noImgUrl from '../../assets/deault-no-img.png'

const getImgUrl = (key) => {
  const publicObj = {
    key,
  }
  const publicUrl = qiniuUploadUtils.getPublicUrl(publicObj);
  return publicUrl;
}

const genImg = (text,type="row") => {
  let classname = '';
  let src = '';
  if (text) {
    src = getImgUrl(text);
  } else {
    src = noImgUrl;
  }
  if(type === 'row'){
    classname = "row-img-style"
  }else{
    classname = "detail-img-style"
  }
  return (<img className={classname} src={src} alt="img" />);
}

export default {
  genImg,
}
