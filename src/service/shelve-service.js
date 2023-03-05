const products = {
  bread: { chilled: false, hazardous: false },
  milk: { chilled: true, hazardous: false },
  bleach: { chilled: false, hazardous: true },
  acamole: { chilled: true, hazardous: true },
};

const getProductProperties = (productId) => {
  return products[productId];
};

const CELL_CAPACITY = 10;

const chilledMock = { x: "0-9", y: "9" };
const hazardousMock = { x: "7-9", y: "7-9" };
const takenMock = [
  { x: 1, y: 0, content: { productId: "bread", quantity: 3 } },
  { x: 3, y: 3, content: { productId: "bamba", quantity: 5 } },
  { x: 9, y: 0, content: { productId: "bleach", quantity: 8 } },
];

const checkCell = (x, y) => {
  const chilled =
    checkDimention(x, chilledMock.x) && checkDimention(y, chilledMock.y);
  const hazardous =
    checkDimention(x, hazardousMock.x) && checkDimention(y, hazardousMock.y);
  const content =
    takenMock.find((cell) => cell.x === x && cell.y === y)?.content || null;
  return { chilled, hazardous, content };
};

const checkDimention = (itemD, shelveD) => {
  if (shelveD.includes("-")) {
    const [left, right] = shelveD.split("-").map((limit) => parseInt(limit));
    return itemD > left && itemD < right;
  } else {
    return itemD === parseInt(shelveD);
  }
};

// TODO cell could have a capacity - bonus points
const generateShelves = (height, width) => {
  const shelves = [];

  for (let y = 0; y < height; y++) {
    let row = [];
    for (let x = 0; x < width; x++) {
      let cell = checkCell(x, y);
      row.push(cell);
    }
    shelves.push(row);
  }

  return shelves;
};

const allocateCell = (content, shelves) => {
  const { productId, quantity } = content;

  if (quantity > CELL_CAPACITY) {
    return { foundCell: false };
  }
  const { chilled, hazardous } = getProductProperties(productId);

  for (let y = 0; y < shelves.length; y++) {
    for (let x = 0; x < shelves[y].length; x++) {
      const curCell = checkCell(x, y);

      // matches by storage type.
      if (chilled === curCell.chilled && hazardous === curCell.hazardous) {
        // matches by contentType | remaining space
        if (
          curCell.content === null ||
          (curCell.content.productId === productId &&
            CELL_CAPACITY - curCell.content.quantity >= quantity)
        ) {
        }
        shelves[y][x].content = {
          productId,
          quantity: curCell.content?.quantity || 0 + quantity,
        };
        return { foundCell: true, cell: `${x},${y}` };
      }
    }
  }
  return { foundCell: false };
};

const shelves = generateShelves(10, 10);

module.exports = { generateShelves, allocateCell, shelves };
