const FILE_TYPE = {
    CHARACTERS: 'characters.csv',
    CHATACTERS_INFO: 'characters_info.csv',
    CHARACTERS_STATS: 'characters_stats.csv',
    CHARACTERS_TO_COMICS: 'charactersToComics.csv',
    COMICS: 'comics.csv',
    CHARACTER_UNIVERSE: 'marvel_dc_characters.csv',
    POWERS: 'superheroes_power_matrix.csv'
};

module.exports = {
    FILE_TYPE,
    getFileType: (fileName) => {
        return Object.keys(FILE_TYPE)
            .find(type => type === fileName);
    },
    getValues: () => {
        return Object.values(FILE_TYPE);
    }
};

