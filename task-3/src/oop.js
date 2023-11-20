/**
 * Напишите класс геометрической точки, принимающей в конструкторе координаты X и Y
 * Если координаты не переданы - 0,0; Аналогично если только 1 координата.
 * Реализовать метод, который возвращает расстояние от точки до центра координат (0, 0)
 */
class Point {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    distanseToCenter() {
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y, 2));
    }
}

/**
 * Напишите класс геометрической точки в трехмерном пространстве (x, y, z),
 * который будет наследоваться от точки в двумерном пространстве.
 * Реализовать статический метод, который возвращает расстояние между Point3D.
 */
class Point3D extends Point {
    constructor(x, y, z = 0) {
        super(x, y);
        this.z = z;
    }
    static vectorLength(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2))
    }
}

/**
 * Напишите класс "очередь", в котором можно добавить элемент в конец и получить из начала.
 * Предусмотреть 2 варианта инициализации - массивом в конструкторе (из него создается очередь) и без параметров.
 * Для тех, кто доверяет, но проверяет: написать тесты на методы класса (oop.spec.js)
 */
class Queue {
    constructor(array = []) {
        this.values = array;
        this.size = this.values.length;
    }
    clear() {
        this.values = [];
        this.size = this.values.length;
    }

    push(...elem) {
        this.values.push(...elem);
        this.size += elem.length;
    }

    pop() {
        if (!this.values.length) return undefined;
        this.size -= 1;
        return this.values.shift();
    }
}

module.exports = {
    Point,
    Point3D,
    Queue,
};
