import {ICalculatedEdges, GraphConstants, Node} from "../Graph";

export class EdgeCalculator {
    public calculateEdges(node: Node): ICalculatedEdges {
        let edges: ICalculatedEdges = {};

        let nextKey: string = node.findNextKeyInSequence();
        edges[GraphConstants.DirEnum.NEXT] = [nextKey];

        let prevKey: string = node.findPrevKeyInSequence();
        edges[GraphConstants.DirEnum.PREV] = [prevKey];

        return edges;
    }
}

export default EdgeCalculator;