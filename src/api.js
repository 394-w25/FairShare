export async function callOpenAi(body) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', // Specify the model you're using
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'text',
                                text: "This is a receipt. Please extract the items on the receipt, then a colon separating it from its quantities and unit prices. Put the extracted values and the total cost, tax amount, and final bill with tax included into a JSON format. For the items, list it in this format: item_list: [ {id: 1, name: 'salmon roll', price: 12.95, quantity: 3}, {id: 2, name:'california roll', price: 8.95, quantity: 2}, ...]",
                            },
                            {
                                type: 'image_url',
                                image_url: {
                                    url: `data:image/jpeg;base64,${body.base64String}`,
                                },
                            },
                        ],
                    },
                ],
                max_tokens: 300,
            }),
        });

        const data = await response.json();
        console.log(data)
        console.log(data['choices'][0]['message']['content'])
        const stringResponse = data['choices'][0]['message']['content'];
        console.log("trying this rn")

        // First, let's clean up the string before trying to parse it
        const cleanString = stringResponse
        .replace(/\\n/g, '') // Remove newline escape characters
        .replace(/\\"/g, '"') // Handle escaped quotes if present
        .trim();  // Remove any extra whitespace
        const match = cleanString.match(/\{[\s\S]*\}/);

        // Before parsing, let's make sure the JSON is properly terminated
        let jsonString = match ? match[0] : null;
        if (jsonString && !jsonString.endsWith('}]}')){
        // Add missing closing brackets if needed
        if (!jsonString.endsWith(']}')) {
            jsonString += ']';
        }
        if (!jsonString.endsWith('}')) {
            jsonString += '}';
        }
        }

        // Now we can safely parse the JSON
        const jsonContent = jsonString ? JSON.parse(jsonString) : null;

        // Create the final parsed JSON object
        const parsedJson = jsonContent ? {
        item_list: jsonContent.item_list,
        mainUser: {name: body.user.email},
        people: body.members,
        tax: jsonContent.tax,
        } : null;

        // Add error handling
        if (!parsedJson) {
        console.error('Failed to parse JSON content');
        return;
        }

        console.log(parsedJson)

        // setJsonData(parsedJson)

        return parsedJson;
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
    }
}