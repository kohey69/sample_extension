window.addEventListener('load', () => {
  const postElement = document.getElementsByClassName('sc-iYdbym')[0];
  const demonGifUrl = chrome.runtime.getURL('images/blue-demon-1.gif');
  const redDemonGifUrl = chrome.runtime.getURL('images/red-demon.gif');
  const awesomeGifUrl = chrome.runtime.getURL('images/awesome.gif');
  console.log(demonGifUrl);

  console.log(postElement);

  const callback = (mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        console.log(mutation);
        mutation.addedNodes.forEach((addedNode) => {
          if(addedNode.tagName == 'LI'){
            console.log('処理対象のNodeが追加' ,addedNode.tagName);
            if(/^https:\/\/www\.sonicgarden\.world\/users\/1\/icon$/.test(addedNode.children[0].children[0].children[0].src) && /kuma/.test(addedNode.children[0].children[0].children[1].children[0].outerText)){
              console.log('誠司さんにマッチした');
              addedNode.style.position = 'relative';
              const newGif = document.createElement('img');
              newGif.src = redDemonGifUrl;
              newGif.classList.add('my-extension-image');
              addedNode.appendChild(newGif);
            }else if(/kuma/.test(addedNode.children[0].children[0].children[1].children[0].outerText)){
              addedNode.style.position = 'relative';
              const newGif = document.createElement('img');
              newGif.src = demonGifUrl;
              newGif.classList.add('my-extension-image');
              addedNode.appendChild(newGif);
            }else if(/くまの部屋/.test(addedNode.children[0].children[0].children[1].children[1].outerText) && !!addedNode.children[0].children[0].children[1].children[1].children[1] && /^https:\/\/www\.sonicgarden\.world\/users\/1\/icon$/.test(addedNode.children[0].children[0].children[0].src) && addedNode.children[0].children[0].children[1].children[0].ariaLabel == '👌, ok_hand'){
              addedNode.style.position = 'relative';
              const newGif = document.createElement('img');
              newGif.src = awesomeGifUrl;
              newGif.classList.add('my-extension-image');
              addedNode.appendChild(newGif);
            }
          }
          else{
            console.log('処理対象外のNodeが追加',addedNode.tagName);
          }
        });
      }else{
        console.log('else');
      }
    }
  };

  const config = { childList: true, subtree: true };

  const observer = new MutationObserver(callback);

  observer.observe(postElement, config);
})
