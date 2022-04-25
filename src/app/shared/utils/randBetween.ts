/**
 * Returns a random number between the numbers you specify
 * @param min - Lower number of two numbers between which a random number is chosen; this number must be less than upper
 * @param max - Upper number of two numbers between which a random number is chosen
 */
export default function randBetween(min, max) {
    return Math.random() * (max - min + 1) + min;
}
