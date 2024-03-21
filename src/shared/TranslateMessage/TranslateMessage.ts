import axios from 'axios';

export const TranslateMessage = async (lang: string, message: string) => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', lang);
    if (lang === 'en') {
        encodedParams.set('target_language', 'ru');
    } else {
        encodedParams.set('target_language', 'en');
    }
    encodedParams.set('text', message);
    try {
        const response = await axios.post('https://text-translator2.p.rapidapi.com/translate',
            encodedParams,
            {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'X-RapidAPI-Key': '75921307bbmsh90aabfd47381070p1f43afjsn3914d1e029f6',
                    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
                }
            });
        console.log(response.data.data.translatedText)
    } catch (error) {
        console.error('Translation error:', error);
        return 'Translation error';
    }
}
