import BasicLowerThirdsSingle from "@/frontend/graphics/generic/lower-thirds/single";
import BasketballScorebug from "@/frontend/graphics/basketball/scorebug";
import type { GraphicDefinition } from "./graphic-definition";

class GraphicRegistry {
    private graphics = new Map<string, GraphicDefinition<any>>();

    register(graphic: GraphicDefinition<any>) {
        if (this.graphics.has(graphic.name)) {
            throw new Error(`Graphic with name "${graphic.name}" is already registered.`);
        }
        this.graphics.set(graphic.name, graphic);
    }

    getAll(): GraphicDefinition<any>[] {
        return Array.from(this.graphics.values());
    }

    getByName(name: string): GraphicDefinition<any> | undefined {
        return this.graphics.get(name);
    }

    getFirstTemplateName(): string {
        return Array.from(this.graphics.keys())[0] ?? "";
    }
}


export const graphicRegistry = new GraphicRegistry();
graphicRegistry.register(BasicLowerThirdsSingle);
graphicRegistry.register(BasketballScorebug);