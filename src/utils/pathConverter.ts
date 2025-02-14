const pathConverter = (somePathString: string) => {
    // Replace Windows backslashes (`\`) with POSIX slashes (`/`)
    const definitelyPosix = somePathString.replace(/\\/g, "/");
    const definitelyWindows = somePathString.replace(/\//g, "\\");

    return { definitelyPosix, definitelyWindows };
};

export default pathConverter;
