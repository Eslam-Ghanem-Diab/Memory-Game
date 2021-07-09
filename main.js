let startBtn = document.querySelector(".control-buttons span"),
    userName,
    gmaeTime = document.querySelector(".timer span"),
    hello = document.querySelector(".name span "),
    blockContainer = document.querySelector(".memory-game-blocks"),
    blocksElments = Array.from(blockContainer.children),
    orderRange = [...Array(blocksElments.length).keys()],
    tries = document.querySelector(".tries span"),
    duration = 1000,
    shuffle,
    flipBlock,
    allFlipedBlocks,
    stopClicking,
    mathcing,
    gameDuration = 60,
    minusGameDuration,
    myIntervalTime;

console.log(blocksElments);
console.log(orderRange);

startBtn.onclick = () => {
    userName = prompt("Let's play Write your name Ya Fofa! ");
    if (userName === "" || userName == null) {
        hello.innerHTML = "Unknown"
    } else {
        hello.innerHTML = userName
    }
    document.querySelector(".control-buttons").remove()
    document.getElementById("start").play()
    gmaeTime.innerHTML = gameDuration
    myIntervalTime()

}


shuffle = (array) => {
    let current = array.length,
        temp,
        random

    while (current > 0) {
        random = Math.floor(Math.random() * current)
        current--

        temp = array[current],
            array[current] = array[random],
            array[random] = temp
    }

    return array;
    
}
shuffle(orderRange)

blocksElments.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener("click", () => flipBlock(block))
})

flipBlock = (selectedBlock) => {
    selectedBlock.classList.add("is-flipped");
    allFlipedBlocks = blocksElments.filter(filpedBlock => filpedBlock.classList.contains("is-flipped"));
    if (allFlipedBlocks.length === 2) {
        stopClicking()
        mathcing(allFlipedBlocks[0], allFlipedBlocks[1])
    } else {
        setTimeout(() => {
            selectedBlock.classList.remove("is-flipped");

        }, duration);
    }
}

stopClicking = () => {
    blockContainer.classList.add("stop-click")
    setTimeout(() => {
        blockContainer.classList.remove("stop-click")
    }, duration);
}

mathcing = (firstBlock, secondBlock) => {
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.add("has-matched")
        secondBlock.classList.add("has-matched")
        firstBlock.classList.remove("is-flipped")
        secondBlock.classList.remove("is-flipped")
        document.getElementById("success").play()
        console.log(firstBlock.dataset.technology);
        console.log(secondBlock.dataset.technology);
    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped")
            secondBlock.classList.remove("is-flipped")
        }, duration);
        document.getElementById("wrong").play()


    }

}
myIntervalTime = () => {
    minusGameDuration = setInterval(() => {
        gameDuration--
        gmaeTime.innerHTML = gameDuration
        if (gameDuration === 0) {
            clearInterval(minusGameDuration)
            alert("time is Out")
            blocksElments.forEach(block => {
                console.log(block);
                block.classList.remove("is-flipped", "has-matched")
            })
            tries.innerHTML = "0" 
            gameDuration = 60
            gmaeTime.innerHTML = gameDuration
            shuffle(orderRange)
            blocksElments.forEach((block, index) => {
                block.style.order = orderRange[index];
                block.addEventListener("click", () => flipBlock(block))
            })
            myIntervalTime()

        }

    }, 1000);


}