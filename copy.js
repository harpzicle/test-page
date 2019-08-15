function copy(field) {
    document.getElementById("reg-output-"+field).select();
    document.execCommand("copy");
}