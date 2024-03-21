let input = document.querySelector("#input")
let searchbtn = document.querySelector(".search")
let notfound = document.querySelector(".not_found")
let apikey = "24ec77c7-c889-4baa-9db6-5c98eb10b732"
let def = document.querySelector(".def")
let audiobox = document.querySelector(".audio")
let loading = document.querySelector(".loading")


searchbtn.addEventListener("click", function (e) {
    e.preventDefault();

    // clear
    notfound.innerText = ""
    def.innerText = ""
    audiobox.innerHTML = ""

    // Get input data
    let word = input.value;

    // callApi to get data
    if (word == "") {
        alert("Word is Required")
        return
    }
    getdata(word);
})

async function getdata(word) {

    loading.style.display = "block"

    // call Ajax Ap
    const responae = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apikey}`)

    const data = await responae.json()
    // empty result
    if (!data.length) {
        loading.style.display = "none"
        notfound.innerText = "no Result is Found"
        return
    }

    // result is suggestion
    if (typeof data[0] == "string") {
        loading.style.display = "none"
        let heading = document.createElement("h3")
        heading.innerText = "Did you mean"
        notfound.appendChild(heading)
        data.forEach(element => {
            let suggestion = document.createElement("span")
            suggestion.classList.add("suggestion")
            suggestion.innerText = element
            notfound.appendChild(suggestion)
        });
        return
    }

    // result found
    loading.style.display = "none"  
    let definition = data[0].shortdef[0]
    def.innerText = definition

    // audio
    const audio = data[0].hwi.prs[0].sound.audio
    if (audio) {
        rendersound(audio)
    }
    console.log(data)
}

function rendersound(audio) {
    // https://media.merriam-webster.com/soundc11
    let subfolder = audio.charAt(0)
    let audiosrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${audio}.wav?key=${apikey}`

    let aud = document.createElement("audio")
    aud.src = audiosrc
    aud.controls = true
    audiobox.appendChild(aud)


}