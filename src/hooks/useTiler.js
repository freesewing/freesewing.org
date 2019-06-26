import { tiler as Tiler } from "@freesewing/utils";

function useTiler(props) {
  const tiler = new Tiler();

  const tile = (svg, format, size) => {
    props.startLoading();
    tiler
      .tile(svg, format, size)
      .then(res => {
        if (res.status === 200) {
          props.stopLoading();
          if (typeof window !== "undefined") window.location = res.data.link;
        }
      })
      .catch(err => {
        props.stopLoading();
        console.log(err);
        props.showNotification("error", err);
      });
    };

  return { tile }

}

export default useTiler;
