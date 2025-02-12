import OpenAI from "openai";

export async function callOpenAi(body) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
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
                response_format: { 
                    type: "json_schema", 
                    json_schema: {
                        name: "receipt_schema",
                        strict: true,
                        schema: {
                            type: "object",
                            description: "Schema for extracting items from a receipt image",
                            properties: {
                                item_list: {
                                    type: "array",
                                    description: "List of items on the receipt",
                                    items: {
                                        type: "object",
                                        properties: {
                                            id: { type: "integer", description: "Item ID" },
                                            name: { type: "string", description: "Item name" },
                                            price: { type: "number", description: "Unit price of the item" },
                                            quantity: { type: "integer", description: "Quantity of the item" }
                                        },
                                        required: ["id", "name", "price", "quantity"],
                                        additionalProperties: false
                                    }
                                },
                                tax: { type: "number", description: "Tax amount" },
                                total: { type: "number", description: "Total cost before tax" },
                                final_bill: { type: "number", description: "Final total after tax" }
                            },
                            required: ["item_list", "tax", "total", "final_bill"],
                            additionalProperties: false
                        }
                    }
                },
                max_tokens: 300,
            }),
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data)

        if (!data.choices || data.choices.length === 0) {
            throw new Error("Invalid response from OpenAI API");
        }

        const jsonContent = data.choices[0].message?.content;
        console.log(jsonContent)

        if (!jsonContent) {
            throw new Error("Failed to extract content from OpenAI response");
        }

        // Since we're using JSON Schema, the content should already be valid JSON
        const parsedJson = JSON.parse(jsonContent);
        console.log(parsedJson)

        // Final structured response
        const finalData = {
            item_list: parsedJson.item_list || [],
            mainUser: { name: body.user?.email || "Unknown" },
            people: body.members || [],
            tax: parsedJson.tax || 0,
            total: parsedJson.total || 0,
            final_bill: parsedJson.final_bill || 0,
        };

        console.log(finalData);
        return finalData;

    } catch (error) {
        console.error("Error calling OpenAI API:", error);
        return null;
    }
}
