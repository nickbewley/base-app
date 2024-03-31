const markerStartSVG = `M12 2C15.3757 2 17.8888 3.71722 18.5858 4.41421C20.8267 6.65512 22 8.67458 22 12C22 13.4793 21.6783 14.8937 21.0961 16.1699C20.5227 17.4269 19.6964 18.5501 18.6757 19.4667C16.9322 21.0325 14.6179 22 11.9991 22C9.3858 22 7.07608 21.0364 5.33429 19.4765C4.30889 18.5582 3.47895 17.4316 2.90365 16.1701C2.3216 14.8938 2 13.4794 2 12C2 8.67458 3.17331 6.65512 5.41421 4.41421C6.11121 3.71722 8.62433 2 12 2Z`
// original marker
const markerEndSVG = `M 23 2 C 29.018 2 34.385 4.034 38.179 7.421 C 41.794 10.647 44 15.131 44 20.365 C 44 22.74 43.043 26.026 41.334 29.89 C 39.649 33.7 37.33 37.861 34.818 41.916 C 30.621 48.692 25.957 55.057 22.998 58.816 C 20.041 55.06 15.379 48.7 11.182 41.928 C 8.671 37.873 6.351 33.712 4.666 29.901 C 2.958 26.036 2 22.746 2 20.365 C 2 15.119 4.203 10.637 7.812 7.416 C 11.606 4.029 16.976 2 23 2 Z` 
// experimental marker, working on a different shape -- doesn't work
// const markerEndSVG = `M23 2C29.018 2 34.3851 4.03353 38.1794 7.42064C41.7939 10.6472 44 15.1309 44 20.3647C44 22.6284 42.9735 25.3486 41.1003 28.5622C39.2463 31.7427 36.725 35.1437 34.0229 38.7594C33.9243 38.8914 33.8254 39.0236 33.7264 39.1561C31.141 42.6147 28.4245 46.2488 26.1595 49.903C24.9734 51.8165 23.8886 53.7701 22.9998 55.7454C22.111 53.7709 21.0263 51.8183 19.8403 49.9059C17.5773 46.2568 14.8638 42.6281 12.2807 39.174C12.1792 39.0383 12.0779 38.9028 11.9768 38.7676C9.27482 35.1535 6.7537 31.7533 4.89989 28.5721C3.02699 25.3581 2 22.6347 2 20.3647C2 15.1187 4.20343 10.6374 7.81238 7.41583C11.6062 4.02913 16.9763 2 23 2Z`
const markerStartColor = "#3396FF"
const markerEndColor = "#0045F7"
const markerViewBoxStart = "0 0 24 24"
const markerViewBoxEnd = "0 0 46 62"
const keySplinesStart = "0 0.75 0.25 1"
const keySplinesEnd = "0 0.55 0.85 1"

export { markerStartSVG, markerEndSVG, markerStartColor, markerEndColor, markerViewBoxStart, markerViewBoxEnd, keySplinesStart, keySplinesEnd }